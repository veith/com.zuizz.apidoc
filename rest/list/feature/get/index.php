<?php
/*
* List all features with restlets
* List all features which have at least 1 restlet documented
*
*
* @author
* @package com.zuizz.apidoc
* @subpackage
*
*
*
* Permissions / Roles
* Developer => Developer can see the list
*
*
*
* States
*
* State 200  =>
* content in response body
*
*
*
*
*/

if ($this->values['identifier'] == null) {
    $this->data['features'] = array_map(function ($a) {
        return basename($a);
    }, glob(ZU_DIR_FEATURE . '*', GLOB_ONLYDIR));
} else {
    $farr    = explode(".", $this->values['identifier']);
    $feature = implode(".", array($farr[0], $farr[1], $farr[2]));
    $varr    = array_slice($farr, 3);
    $varr[]  = "*";
    $view    = implode("/", $varr);
    $folder  = ZU_DIR_FEATURE . implode("/", array($feature, "rest", $view));

    $content = glob($folder, GLOB_ONLYDIR);
    foreach ($content as $file) {
        $node = basename($file);
        // get put delete post,... rausfiltern
        if ($node == "get" || $node == "put" || $node == "delete" || $node == "post" || $node == "head" || $node == "trace" || $node == "connect" || $node == "options") {
            $element['method'] = $node;

            // Versionen finden
            $versionen = glob($file . '/*doc.json');


            foreach ($versionen as $version) {
                $r = explode(".", basename($version));
                $doc = json_decode(file_get_contents($version), true);

                if (count($r) == 3) {
                    $element['title']        = $doc['title'];
                    $element['version']      = $r[0];
                    $this->data['element'][] = $element;
                } else {

                    $element['title']        = $doc['title'];
                    $element['version']      = 0;
                    $this->data['element'][] = $element;
                }


            }


        } else {
            $this->data['subs'][] = $node;
        }
    }
}
$this->data['request']   = $this->values['identifier'];
$this->data['request_u'] = str_replace(".", "_", $this->values['identifier']);


/*
 * Mimetype html
 * Returns:
 * complete list
*/

// set default mimetype
if (!$this->mimetype) {
    $this->mimetype = 'html';
}

switch ($this->mimetype) {
    case "html":
        global $smarty; // smarty object
        $GLOBALS['ZUIZZ']->init_smarty();

        $this->fetch();

        break;
    case "json":
        header('Content-type: application/json');
        $this->contentbuffer = json_encode($this->data);
        break;
}