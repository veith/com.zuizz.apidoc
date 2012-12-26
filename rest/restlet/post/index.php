<?php
/* 
* Apidoc Add RESTlet
* Add Restlet
*
*
* @author
* @package com.zuizz.apidoc
* @subpackage
*
*
*
* Permissions / Roles
* Developer => Developer can Add new RESTlet
*
*
*
* States
*
* State 201  => Created
* OK, Restlett sucessfull added
*
* State 500  => Server Error
* Something went wrong
*
* State 400  => Bad
* RESTlet already exists
*
*
*/

// prüfe ob das Restlet bereits existiert
$feature = $this->values['newfeature'];
$restlet = str_replace(".","/", $this->values['element']);

$method  = $this->config['definition']['method'][$this->values['method']];
$target  = ZU_DIR_FEATURE . "{$feature}/rest/{$restlet}/" . strtolower($method) . "/doc.json";

$source = ZU_DIR_FEATURE . "{$this->feature}/configs/template.doc.json";

if (is_file($target)) {
    ZU::header(400, 'RESTlet already exist');
    echo "The restlet [{$feature}.{$restlet}] with mehtod [{$method}] already exists.";
} else {
    $targetfolder =  pathinfo($target,PATHINFO_DIRNAME);
// Ordner erstellen
    if(!is_dir($targetfolder)){
        $oldmask = umask(0);
        mkdir($targetfolder,0777,true);
        umask($oldmask);
    }


// json.doc aus template erstellen   (bei neuem objekt das template objekt laden, bei clone das quellobjekt laden)

    if($this->values['source'] != ''){

        $farr    = explode(".", $this->values['source']);
        $version = $farr[0];

        $feature = implode(".", array($farr[1], $farr[2], $farr[3]));

        $varr = array_slice($farr, 4);
        if ($version == 0) {
            $varr[] = "doc.json";
        } else {
            $varr[] = "{$version}.doc.json";
        }


        $view = implode("/", $varr);
        $source = ZU_DIR_FEATURE . implode("/", array($feature, "rest", $view));


    }


    $doc = json_decode(file_get_contents($source));

// werte aktualisieren



    $doc->title       = $this->values['title'];
    $doc->request     = "{$feature}.{$this->values['element']}";
    $doc->method      = $method;

    // Objekt an neuer Stelle sichern
    file_put_contents($target,json_encode($doc));

    $this->data['message'] = "RESTlet sucessfully created";
    $this->data['restlet'] = "0.{$feature}.{$this->values['element']}." . strtolower($method) ;



    ZU::header(201);

    header('Content-type: application/json');
    $this->contentbuffer = json_encode($this->data);

}



