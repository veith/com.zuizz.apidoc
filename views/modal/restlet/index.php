<?php

$this->data['features'] = array_map('basename', glob(ZU_DIR_FEATURE . '*', GLOB_ONLYDIR));

$this->fetch();