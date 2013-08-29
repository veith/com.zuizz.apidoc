<?php

if ($this->values['identifier'] == null) {
    $this->data['features'] = array_map(function ($a) {
        return array('name' => basename($a), 'href' => '/api/'. $this->version .'/' . $this->feature . '/features/' . basename($a) ,
            'href_restlets' => '/api/'. $this->version .'/' . $this->feature . '/features/' . basename($a) . '/restlets/');
    }, glob(ZU_DIR_FEATURE . '*', GLOB_ONLYDIR));
} else {
// Load feature description and info
    $conf = parse_ini_file(ZU_DIR_FEATURE . $this->identifier . "/configs/config.ini", true);
    $this->data['feature_id'] = $conf['feature']['feature_id'];

    //readme
    if(is_file(ZU_DIR_FEATURE . $this->identifier . "/rest/readme.md")){
        $this->data['readme'] = file_get_contents(ZU_DIR_FEATURE . $this->identifier . "/rest/readme.md");
    }
    $this->data['href'] = '/api/'. $this->version .'/' . $this->feature . '/features/' . $this->identifier . '/restlets/';
}


/*
 * Mimetype html
 * Returns:
 * complete list
*/

// set default mimetype
if (!$this->mimetype) {
    $this->mimetype = 'json';
}

switch ($this->mimetype) {

    case "json":
        header('Content-type: application/json');
        $this->contentbuffer = json_encode($this->data);
        break;
}