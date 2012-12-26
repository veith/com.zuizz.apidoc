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


if (ZU::count('rst_parameter', array('apidoc_id' => $this->values['identifier'],
                                     'name'      => $this->values['name'])) > 0
) {


    ZU::header(400, 'Parameter already exist');
    echo "The parameter already exists.";
} else {
    $param = ORM::for_table('rst_parameter')->create();

    $param->apidoc_id         = $this->values['identifier'];
    $param->name              = $this->values['name'];
    $param->description       = $this->values['description'];
    $param->type              = $this->values['type'];
    $param->required          = $this->values['required'];
    $param->regularexpression = $this->values['regexp'];
    $param->save();

    $this->data['message']     = "Parameter sucessfully created";
    $this->data['parameterID'] = $param->id();

    ZU::header(201);
    header('Content-type: application/json');
    $this->contentbuffer = json_encode($this->data);

}


