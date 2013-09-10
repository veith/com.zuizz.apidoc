<?php
// load states
include ZU_DIR_LIBS . "helper/http.headers.php";
$this->data  = $GLOBALS['ZUIZZHEADERCODES'];

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