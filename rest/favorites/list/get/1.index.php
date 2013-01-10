<?php 
/* 
 * Apidoc favorites list
 * Favorites list
 *
 *
 * @author 
 * @package com.zuizz.apidoc
 * @subpackage 
 *
 *
 *
 * Permissions / Roles 
 * Developer => Documentation for developer
 *
 *
 *
 * States 
 *
 *
 *
 * Available variables 
 *
 *
 *
 */

$this->data['favorites'] = array();

$methods = array("GET", "HEAD", "PUT", "DELETE", "POST", "OPTIONS", "TRACE", "CONNECT");



$items = ORM::for_table('rst_apidoc')
    ->raw_query("SELECT ad.id, ad.title, ad.request, ad.method from rst_apidoc ad left join rst_favorites fav on fav.apidoc_id = ad.id where fav.user_id = :user_id order by fav.id DESC",array('user_id' => ZU::get_user_id()))
    ->find_array();

foreach ($items as $key => $item) {

    $this->data['favorites'][$key]['id'] = $item['id'];
    $this->data['favorites'][$key]['title'] = $item['title'];
    $this->data['favorites'][$key]['request'] = $item['request'];
    $this->data['favorites'][$key]['method'] = $methods[$item['method']];

}


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