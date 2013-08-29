<?php
/* 
* Apidoc Autocomplete
* Autocomplete list
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
* i.e. com.zuizz.apidoc.view.full
* varname:request (string), always available:0
*
*
*
*/


$this->data['request'] = $this->values['request'];
$this->data['num_of_results'] = 0;
$this->data['results'] = array();

if (empty($this->values['items'])) {
    $this->values['items'] = 30;
}

$srch = ORM::for_table('rst_apidoc');

if(isset($this->values['method']) && $this->values['method'] >= 0){
    $srch->where('method',$this->values['method']);
}

$srch->where_like('request','%' . $this->values['request'] . '%');

$this->data['results'] = $srch->find_array();
$this->data['num_of_results'] = count($this->data['results']);




if (!$this->mimetype) {
    $this->mimetype = 'json';
}
switch ($this->mimetype) {
    case "json":
        header('Content-type: application/json');
        $this->contentbuffer = json_encode($this->data);
        break;

}