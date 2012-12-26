<?php 
/* 
 * Apidoc favorites check
 * Checkt ob eine ApidocID bereits in den Favoriten enthalten ist.
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
 * State 200  => OK
 * OK, content in message body
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



if(ZU::count('rst_favorites', array('user_id' => ZU::get_user_id(), 'apidoc_id' => $this->identifier)) > 0){
    $this->data['isFavorite'] = true;
}else{
    $this->data['isFavorite'] = false;
}






/* 
 * Mimetype json 
 * Returns:
 * {isFavorite:true}
*/

// set default mimetype
if (!$this->mimetype) {
    $this->mimetype = 'json'; 
}

switch ($this->mimetype) {
   case "json":
     header('Content-type: application/json');
     $this->contentbuffer = json_encode($this->data);
   break;

}