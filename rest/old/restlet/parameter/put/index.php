<?php

// json laden

// data konvertieren
foreach ($this->values['data'] as $row) {
    $data[$row['name']] = $row['value'];
}


$farr    = explode(".", $this->values['identifier']);
$version = $this->values['version'];

$feature = implode(".", array($farr[0], $farr[1], $farr[2]));

$varr   = array_slice($farr, 3);
$varr[] = strtolower($this->values['method']);

if ($version == 0) {
    $varr[] = "doc.json";
} else {
    $varr[] = "{$version}.doc.json";
}


$view = implode("/", $varr);
$file = ZU_DIR_FEATURE . implode("/", array($feature, "rest", $view));


$doc = json_decode(file_get_contents($file));

if(!is_object($doc->parameter)){
    $doc->parameter = new stdClass();
}
// verhindere das adden leerer elemente
if ($data['identifier'] == '' && $data['name'] == '') {

} else {
// neues element
    if ($data['identifier'] == '') {
        $data['identifier'] = $data['name'];
    }

// objekt entfernen
    if ($data['name'] == '') {
        unset($doc->parameter->$data['identifier']);
    } else {
        //aktualisieren
        $doc->parameter->$data['identifier']->description       = $data['description'];
        $doc->parameter->$data['identifier']->name              = $data['name'];
        $doc->parameter->$data['identifier']->regularexpression = $data['regularexpression'];
        $doc->parameter->$data['identifier']->default_value     = $data['default'];
        $doc->parameter->$data['identifier']->type              = $data['type'];

        if (isset($data['required']) && $data['required'] == 'on') {
            $doc->parameter->$data['identifier']->required = 1;
        } else {
            $doc->parameter->$data['identifier']->required = 0;
        }
        if ($data['identifier'] != $data['name']) {
            $doc->parameter->$data['name'] = $doc->parameter->$data['identifier'];
            unset($doc->parameter->$data['identifier']);
        }
    }
}


// json sichern
file_put_contents($file, json_encode($doc));
$this->data['message'] = 'record updated';

/*
 * Mimetype json
 * Returns:
 *
*/

// set default mimetype
if (!$this->mimetype) {
    $this->mimetype = 'html';
}

switch ($this->mimetype) {
    case "json":
        header('Content-type: application/json');
        $this->contentbuffer = json_encode($this->data);
        break;
    case "xml":
        header('Content-type: application/xml');
        ZU::load_class('lalit.array2xml', 'xml', true);
        $xml                 = Array2XML::createXML('doc', $this->data);
        $this->contentbuffer = $xml->saveXML();
        break;
    case "html":
        global $smarty; // smarty object
        $GLOBALS['ZUIZZ']->init_smarty();

        $this->fetch();

        break;
}