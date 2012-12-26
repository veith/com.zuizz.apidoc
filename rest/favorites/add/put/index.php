<?php
/* 
* Apidoc add favorites
* Add doc item to favorites
*
*
* @author
* @package com.zuizz.apidoc
* @subpackage
*
*
*
* Permissions / Roles
*
*
*
* States
*
*
*
* Available variables
*
* apidocID
* varname:identifier (numeric), always available:1
*
*
*
*/

// your code somewhere here 

$this->identifier;

$rec = ORM::for_table('rst_favorites')->create();
$rec->user_id = ZU::get_user_id();
$rec->apidoc_id = $this->identifier;
$rec->save();

$this->data['message'] = "Item {$this->identifier} added. Refresh favorites list if you want";


// Nur json
header('Content-type: application/json');
$this->contentbuffer = json_encode($this->data);

