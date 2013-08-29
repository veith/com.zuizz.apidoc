<?php

// json laden

$farr    = explode(".", $this->values['identifier']);
$version = $this->values['version'];

$feature = implode(".", array($farr[0], $farr[1], $farr[2]));

$varr = array_slice($farr, 3);
$varr[] = strtolower($this->values['method']);

if ($version == 0) {
    $varr[] = "doc.json";
} else {
    $varr[] = "{$version}.doc.json";
}


$view = implode("/", $varr);
$file = ZU_DIR_FEATURE . implode("/", array($feature, "rest", $view));



$doc = json_decode(file_get_contents($file));

// objekt aktualisieren
$doc->title = $this->values['title'];
$doc->description = $this->values['description'];



// json sichern
file_put_contents($file,json_encode($doc));

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