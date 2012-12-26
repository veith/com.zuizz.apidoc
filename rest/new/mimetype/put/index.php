<?php
/*
* Add a Parameter
* Add a Parameter to a restlet
*
*
* @author
* @package com.zuizz.apidoc
* @subpackage
*
*
*
* Permissions / Roles
* Developer => Developer can Add new Parameter
*/


if (ZU::count('rst_mimetype', array('apidoc_id' => $this->values['identifier'],
                                    'name'      => $this->values['name'])) > 0
) {


    ZU::header(400, 'Mimetype already exist');
    echo "The mimetype already exists.";
} else {
    $mime             = ORM::for_table('rst_mimetype')->create();
    $mime->apidoc_id  = $this->values['identifier'];
    $mime->name       = $this->values['name'];
    $mime->is_default = $this->values['default'];
    $mime->response   = $this->values['response'];
    $mime->save();


    $this->data['message']    = "Mimetype sucessfully created";
    $this->data['mimetypeID'] = $mime->id();

    ZU::header(201);
    header('Content-type: application/json');
    $this->contentbuffer = json_encode($this->data);

}


