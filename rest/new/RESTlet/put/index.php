<?php
/* 
* Apidoc Add RESTlet
* Add Restlet
*
*
* @author
* @package com.zuizz.apidoc
* @subpackage
*
*
*
* Permissions / Roles
* Developer => Developer can Add new RESTlet
*
*
*
* States
*
* State 201  => Created
* OK, Restlett sucessfull added
*
* State 500  => Server Error
* Something went wrong
*
* State 400  => Bad
* RESTlet already exists
*
*
*/


if (ZU::count('rst_apidoc', array('request' => $this->values['feature'] . "." . $this->values['element'],
                                  'method'  => $this->values['method'])) > 0
) {


    ZU::header(400, 'RESTlet already exist');
    echo "The RESTlet already exists.";
} else {
    $apidoc = ORM::for_table('rst_apidoc')->create();

    $apidoc->title = $this->values['title'];
    $apidoc->request   = $this->values['feature'] . "." . $this->values['element'];
    $apidoc->description = $this->values['description'];
    $apidoc->method      = $this->values['method'];
    $apidoc->save();
    $this->data['message']  = "RESTlet sucessfully created";
    $this->data['apidocID'] = $apidoc->id();

    ZU::header(201);
    header('Content-type: application/json');
    $this->contentbuffer = json_encode($this->data);

}


