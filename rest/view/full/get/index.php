<?php
/* 
* Apidoc full view
* Show all entries for feature => module api
*
*
* @author
* @package com.zuizz.apidoc
* @subpackage
*
*
*
* Permissions / Roles
* Public => Die Dokumentation darf von jedem gelesen werden
*
*
*
* States
*
* State 200  => OK
*
*
* State 404  => Element not found
* Wird zurückgegeben wenn die entsprechende ID nicht existiert
*
*
*
* Available variables
*
* apidoc_id
* varname:identifier (numeric), always available:1
*
*
*
*/

// your code somewhere here 


$farr    = explode(".", $this->values['identifier']);
$version = $farr[0];

$feature = implode(".", array($farr[1], $farr[2], $farr[3]));

$varr = array_slice($farr, 4);
if ($version == 0) {
    $varr[] = "doc.json";
} else {
    $varr[] = "{$version}.doc.json";
}


$view = implode("/", $varr);
$file = ZU_DIR_FEATURE . implode("/", array($feature, "rest", $view));

$finf = stat($file);


$doc = json_decode(file_get_contents($file), true);

$this->data = $doc;
$this->data['version'] = $version;
$this->data['feature'] = $feature;

$this->data['info'] = $finf;
$this->data['info']['cdate'] = date('d.m.y H:i:s',$finf[10]);
$this->data['info']['mdate'] = date('d.m.y H:i:s',$finf[9]);
$this->data['info']['accessdate'] = date('d.m.y H:i:s',$finf[8]);

include ZU_DIR_LIBS . "helper/http.headers.php";
$this->data['header'] = $GLOBALS['ZUIZZHEADERCODES'];


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

        $this->fetch();

        break;
}