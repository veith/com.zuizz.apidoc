<?php



$target = ZU_DIR_FEATURE .   $this->values['feature'] . '/rest/'   .   $this->values['path'] . '/' .   $this->values['name'];



// Ordner erstellen
if (!is_dir($target)) {
    $oldmask = umask(0);
    mkdir($target, 0777, true);
    umask($oldmask);
    ZU::header(201);
    $this->data['message'] = 'Everything ok';
}else{
    ZU::header(500);
    $this->data['message'] = 'Folder already exists';
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