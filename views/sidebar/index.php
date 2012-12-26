<?php
if(!isset($this->session['last'])){$this->session['last'] = array();}
if(!isset($this->session['favorites'])){$this->session['favorites'] = array();}


$methods = array("GET", "HEAD", "PUT", "DELETE", "POST", "OPTIONS", "TRACE", "CONNECT");






$this->fetch();