<?php
/* 
* Add Role Permissions to RESTlet
* Add additional Role Permissions to the RESTlet.
* Use this way for simple role-based permissions. You can also use the config based permission or the table-based permission mechanisms
*
*
* @author
* @package com.zuizz.apidoc
* @subpackage
*
*
*
* Permissions / Roles
* Developer => Developer can give Rights
*
*
*
* States
*
* State 500  =>
* Server Error
*
* State 400  => Role already registered
* Role already registered
*
* State 201  => Role successful registered
* Role successful registered
*
*
*
* Available variables
*
* Why does this Role have access to this RESTlet?
* varname:description (string), always available:1
*
* The apidocID
* varname:identifier (numeric), always available:1
*
* Name of the Role.
If you add a non existing rolename, the builder will automaticly generate the role. You only have to assign users to the appropriate role
* varname:role (string), always available:1
*
*
*
*/

if (ZU::ORMselectCount('rst_role', array('apidoc_id' => $this->values['identifier'],
                                'role'      => $this->values['role'])) > 0
) {
    ZU::header(400, 'role is already registered');
    echo "The role is already registered.";
} else {
    $role            = ORM::for_table('rst_role')->create();
    $role->apidoc_id = $this->values['identifier'];
    $role->role = $this->values['role'];
    $role->description = $this->values['description'];
    $role->save();

    $this->data['message'] = "Role sucessfully registered";
    $this->data['roleID']  = $role->id();


    ZU::header(201);
    header('Content-type: application/json');
    $this->contentbuffer = json_encode($this->data);

}

