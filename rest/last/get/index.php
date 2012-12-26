<?php
/* 
* Apidoc add last seen
* Updates last seen item for the sidebar list
*
*
* @author Veith
* @package com.zuizz.apidoc
* @subpackage
*
*
*
* Permissions / Roles
*
*
*
* States
*
* State 200  => OK
* Element wurde in Liste aufgenommen
*
*
*
* Available variables
*  identifier
*
*/


$methods = array("GET", "HEAD", "PUT", "DELETE", "POST", "OPTIONS", "TRACE", "CONNECT");

$doc = ORM::for_table('rst_apidoc')->find_one($this->identifier)->as_array();


// entfernen
unset($this->session['last'][$this->identifier]);
// drehen
$this->session['last'] = array_reverse($this->session['last'], true);
// hinzufügen
$this->session['last'][$this->identifier]['id'] = $doc['id'];
$this->session['last'][$this->identifier]['title'] = $doc['title'];
$this->session['last'][$this->identifier]['request'] = $doc['request'];
$this->session['last'][$this->identifier]['method'] = $methods[$doc['method']];


$this->data['message'] = "List updated";

// nochmals drehen (neue vorne)
$this->session['last'] = array_reverse($this->session['last'], true);
$iteration = 0;
// elemente nach 12 löschen
foreach ($this->session['last'] as $key => $value) {
    $iteration++;
    if ($iteration < 10) {
        $tmparr[$key] = $value;
    }
}
$this->session['last'] = $tmparr;

switch ($this->mimetype) {
    case "json":
        header('Content-type: application/json');
        $this->contentbuffer = json_encode($this->data);
        break;
    case "xml":
        header('Content-type: application/xml');
        ZU::load_class('lalit.array2xml', 'xml', true);
        $xml = Array2XML::createXML('auth', $this->data);
        $this->contentbuffer = $xml->saveXML();
        break;

}