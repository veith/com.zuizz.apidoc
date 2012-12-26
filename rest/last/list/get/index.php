<?php
/* 
* Apidoc last seen list
* Html formatierte Liste der zulezt besuchten Dokumentationen
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
* Ok, Message Body enthält liste
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


/* 
 * Mimetype html 
 * Returns:
 * html formated list of last seen documentation entries
*/

// set default mimetype
if (!$this->mimetype) {
    $this->mimetype = 'html';
}

switch ($this->mimetype) {
    case "html":

        $this->fetch();

        break;
}