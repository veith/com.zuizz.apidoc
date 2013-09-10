<?php

/** @var $this ZUFEATURE */
/** @var $REST ZUREST */

try {
    //check if method is valid
    if (!in_array($this->values['method'], array('get', 'put', 'post', 'delete'))) {
        throw new Exception('invalid method',500);
    }

    $target_folder = ZU_DIR_FEATURE . $this->values['feature'] . '/rest/' . $this->values['path'] . '/_' . $this->values['method'];
    //check if method already exists
    if (is_dir($target_folder)) {
        throw new Exception('Folder already exists');
    } else {
        //create method folder
        $oldmask = umask(0);
        mkdir($target_folder, 0777, true);
        umask($oldmask);
        ZU::header(201);
        $this->data['message'] = 'Everything ok';

        //copy doc.json from template
        copy(ZU_DIR_FEATURE . $this->feature . '/configs/' . $this->values['method'] . '.template.doc.json', $target_folder . '/doc.json');
        //TODO:: ZUIZZ fill doc.json with parameters (post,put) from restlet fields list
        ZU::header(201);
    }

} catch (Exception $e) {
    switch($e->getCode()){
        case 500:
            ZU::header(500);
            $this->data['message'] = $e->getMessage();
            break;
        default:
            ZU::header(500);
            $this->data['message'] = $e->getMessage();
    }

}





switch ($this->mimetype) {
    case "json":
        header('Content-type: application/json');
        $this->contentbuffer = json_encode($this->data);
        break;

}