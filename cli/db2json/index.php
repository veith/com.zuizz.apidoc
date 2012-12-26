<?php

$methods = array("GET", "HEAD", "PUT", "DELETE", "POST", "OPTIONS", "TRACE", "CONNECT");
// loop: alle Apidoc einträge durchgehen
$features = ORM::for_table('rst_apidoc')->find_array();

foreach ($features as $feature) {
    $farr              = explode(".", $feature['request']);
    $thefeature        = "{$farr[0]}.{$farr[1]}.{$farr[2]}";
    $themodule         = implode("/", array_slice($farr, 3));
    $themethod         = strtolower($methods[$feature['method']]);
    $feature_directory = ZU_DIR_FEATURE . $thefeature . "/rest/" . $themodule . "/" . $themethod;

    $docfile = $feature_directory . "/doc.json";

    // daten laden falls doc noch nicht existiert, sonst überspringen
    if (!is_file($docfile) && is_dir(ZU_DIR_FEATURE . $thefeature)) {

        if(!is_dir($feature_directory)){
            mkdir($feature_directory,0777,true);
        }

        // json erstellen
        $docid = $feature['id'];
        $doc   = ORM::for_table('rst_apidoc')->select('title')->select('request')->select('method')->select('description')->find_one($feature['id'])->as_array();

        $doc['method'] = strtoupper($methods[$doc['method']]);
        // Keine Doku vorhanden
        // parameter
        $doc['parameter'] = array();
        foreach (ORM::for_table('rst_parameter')->select('description')->select('name')
                     ->select('type')
                     ->select('required')
                     ->select('default_value')
                     ->select('regularexpression')
                     ->where('apidoc_id', $docid)->find_array() as $tmp) {

            $tmp['type']                    = intval($tmp['type']);
            $tmp['required']                = intval($tmp['required']) == true;
            $doc['parameter'][$tmp['name']] = $tmp;

        }

        // states
        $doc['states'] = array();
        foreach (ORM::for_table('rst_states')->select('code')->select('message')->select('description')->where('apidoc_id', $docid)->find_array() as $tmp) {
            $tmp['code']                 = intval($tmp['code']);
            $doc['states'][$tmp['code']] = $tmp;
        }


        // Perm
        $doc['permission'] = array();
        foreach (ORM::for_table('rst_role')->select('role')->select('description')->where('apidoc_id', $docid)->find_array() as $tmp) {
            $doc['permission'][] = $tmp;
        }

        // mimetypes
        $doc['mimetype'] = array();
        foreach (ORM::for_table('rst_mimetype')->select('name')->select('is_default')->select('response')->where('apidoc_id', $docid)->find_array() as $tmp) {
            $tmp['is_default']                         = intval($tmp['is_default']) == true;
            $doc['mimetype'][$tmp['name']]             = $tmp;
            $doc['mimetype'][$tmp['name']]['response'] = htmlentities($tmp['response']);

        }


        // doc schreiben
        file_put_contents($docfile, json_encode($doc));
        chmod($docfile, 0777);
    }


}