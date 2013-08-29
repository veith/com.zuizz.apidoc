<?php


    $varr = explode(".", $this->identifiers['restlets']);
    $feature = $this->identifiers['features'];

    $varr[] = "*";
    $view = implode("/", $varr);
    $folder = ZU_DIR_FEATURE . implode("/", array($feature, "rest", $view));

    $content = glob($folder, GLOB_ONLYDIR);
    foreach ($content as $file) {
        $node = basename($file);
        // get put delete post,... rausfiltern
        if ($node == "_get" || $node == "_put" || $node == "_delete" || $node == "_post" || $node == "_head" || $node == "_trace" || $node == "_connect" || $node == "_options") {
            $element['method'] = substr($node,1);

            // Versionen finden
            $versionen = glob($file . '/*doc.json');
            $this->data['fields'] = array();

            foreach ($versionen as $version) {
                $r = explode(".", basename($version));
                $doc = json_decode(file_get_contents($version), true);
                $element['title'] = $doc['title'];
                if (count($r) == 3) {
                    $element['version'] = (int) $r[0];
                    $v = '.' . $element['version'];
                } else {
                    $element['version'] = 0;
                    $v = '';
                }
                $element['href'] =  '/api/'. $this->version .'/' . $this->feature . '/features/' . $this->identifiers['features'] . '/restlets/'  .$this->identifier . '/methods/'  . substr($node,1) . $v ;
                $this->data['methods'][] = $element;

            }


        } else {

            if($this->identifier != null){
                $subnode = $this->identifier . '.';

            }else{
                $subnode = '';
            }
            $this->data['children'][] = array('name' => $node, 'href' => '/api/'. $this->version .'/' . $this->feature . '/features/' . $this->identifiers['features'] . '/restlets/'  . $subnode  . $node );

        }

    }
$p = explode('.',$this->identifier);
if(count($p) > 1){
    $p = array_slice($p,0,-1);
    $this->data['parent'][] = array('name' => implode('.',array_slice($p,-1)) , 'href' => '/api/'. $this->version .'/' . $this->feature . '/features/' . $this->identifiers['features'] . '/restlets/'  . implode('.',$p) );
}

$restlet = array_slice(explode('.', $this->identifiers['restlets']),-1);
$this->data['info']['feature'] = $feature;
$this->data['info']['restlet'] = $restlet[0];
$this->data['info']['restlet_path'] = str_replace('.','/',$this->identifiers['restlets']);



/*
 * Mimetype html
 * Returns:
 * complete list
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