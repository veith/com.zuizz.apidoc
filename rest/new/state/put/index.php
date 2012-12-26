<?php
/* 
* Add State Response Header
* Add a new response header for the RESTlet
*
*
* @author
* @package com.zuizz.apidoc
* @subpackage
*
*
*
* Permissions / Roles
* Developer => Developer can Add new State
*
*
*
* States
*
*
*
* Available variables
*
* Header Response Code
* varname:code (numeric), always available:1
*
* When or why does this RESTlet returns this state?
* varname:description (string), always available:1
*
* The apidocID
* varname:identifier (numeric), always available:1
*
* Your own response message
* varname:message (string), always available:0
*
*
*
*/


if (ZU::count('rst_states', array('apidoc_id' => $this->values['identifier'],
                                  'code'      => $this->values['code'])) > 0
) {


    ZU::header(400, 'State is already registered');
    echo "The state is already registered.";
} else {
    $state = ORM::for_table('rst_states')->create();
    $state->apidoc_id   = $this->values['identifier'];
    $state->code        = $this->values['code'];
    $state->message     = $this->values['message'];
    $state->description = $this->values['description'];

    $state->save();
    $this->data['message'] = "State sucessfully registered";
    $this->data['stateID'] = $state->id();


    ZU::header(201);
    header('Content-type: application/json');
    $this->contentbuffer = json_encode($this->data);

}

