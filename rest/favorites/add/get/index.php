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
 *
 *
 */

// your code somewhere here 



$this->data['message'] = "dont forget the message";


switch ($this->mimetype) {
   case "json":
     header('Content-type: application/json');
     $this->contentbuffer = json_encode($this->data);
   break;
   case "xml":
     header('Content-type: application/xml');
     ZU::load_class('lalit.array2xml', 'xml', true);
     $xml = Array2XML::createXML('auth', $this->data);
     $this->contentbuffer = $xml->saveXML();
   break;
}