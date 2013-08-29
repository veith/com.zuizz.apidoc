<?php 
/* 
 * List all features with restlets
 * List all features which have at least 1 restlet documented
 *
 *
 * @author 
 * @package com.zuizz.apidoc
 * @subpackage 
 *
 *
 *
 * Permissions / Roles 
 * Developer => Developer can see the list
 *
 *
 *
 * States 
 *
 * State 200  => 
 * content in response body
 *
 *
 *
 * Available variables 
 *
 * 0 = alphabetic asc
1 = alphabetic desc
2 = create date asc
3 = create date desc
4 = mod date asc
5 = mod date desc
 * varname:order (numeric), always available:0
 *
 *
 *
 */



$methods = array("GET", "HEAD", "PUT", "DELETE", "POST", "OPTIONS", "TRACE", "CONNECT");

$features = ORM::for_table('rst_apidoc');
switch($this->values['order']){
    case 0:
        $features->order_by_asc('request');
        break;
    default:
        $features->order_by_asc('request');
}

// liste aller features


foreach ($features->find_array() as $feature) {

    $arr = explode('.',$feature['request']);
    $collection =    implode(".", array_slice($arr,0,4));

    $restlet['id'] = $feature['id'];
    $restlet['method'] = $methods[$feature['method']];
    $restlet['title'] = $feature['title'];
    $restlet['uri'] = implode(".", array_slice($arr,4));

    $this->data['features'][implode(".", array_slice($arr,0,3))]['collection'][$collection]['restlets'][] = $restlet;
    $this->data['features'][implode(".", array_slice($arr,0,3))]['feature_id'] = $feature['feature_id'];
}



/* 
 * Mimetype html 
 * Returns:
 * complete list
*/

// set default mimetype
if (!$this->mimetype) {
    $this->mimetype = 'html';
}

switch ($this->mimetype) {
    case "html":
        global $smarty; // smarty object
        $GLOBALS['ZUIZZ']->init_smarty();

        $this->fetch();

        break;
}