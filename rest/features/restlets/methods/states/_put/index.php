<?php

/** @var $this ZUFEATURE */
/** @var $REST ZUREST */
try {
    $REST = & $this->rest;


    $varr = explode(".", $this->identifiers['restlets']);
    $feature = $this->identifiers['features'];
    $meth = explode('.', $this->identifiers['methods']);
    if (isset($meth[1])) {
        $version = $meth[1];
    } else {
        $version = 0;
    }

    $varr[] = "_" . $meth[0];
    $view = implode("/", $varr);
    $folder = ZU_DIR_FEATURE . implode("/", array($feature, "rest", $view));


    if ($version == 0) {
        $file = $folder . "/doc.json";
    } else {
        $file = $folder . "/{$version}.doc.json";
    }


    $finf = stat($file);


    $doc = json_decode(file_get_contents($file), true);


// objekt aktualisieren

    $doc['states'][$this->identifier]['code'] = $this->identifier;

    if ($this->values['message'] != null) {
        $doc['states'][$this->identifier]['message'] = $this->values['message'];
    }else{
        if (!isset($doc['states'][$this->identifier]['message'])) {
            $doc['states'][$this->identifier]['message'] = "";
        }
    }

    if ($this->values['description'] != null) {
        $doc['states'][$this->identifier]['description'] = $this->values['description'];
    }else{
        if (!isset($doc['states'][$this->identifier]['description'])) {
            $doc['states'][$this->identifier]['description'] = "";
        }
    }


    $this->data = $doc['states'][$this->identifier];

// json sichern
    file_put_contents($file, json_encode($doc));

    ZU::header(202);
} catch (Exception $e) {
    ZU::header(404);
    $this->data['message'] = $e->getMessage();
}


switch ($this->mimetype) {
    case "json":
        header('Content-type: application/json');
        $this->contentbuffer = json_encode($this->data);
        break;

}