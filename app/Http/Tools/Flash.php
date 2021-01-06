<?php

namespace App\Http\Tools;

class Flash
{
    protected function create($title, $msg, $level, $key = "flash_message")
    {
        return session()->flash($key,[
            "title" => $title,
            "message" => $msg,
            "level" => $level
        ]);
    }
    public function overlay($title, $msg = "", $level = "success")
    {
        return $this->create($title, $msg, $level,"flash_message_overlay");
    }
    public function info($title,$msg)
    {
        return $this->create($title, $msg  = "", "info");
    }
    public function success($title,$msg)
    {
        return $this->create($title, $msg  = "", "success");
    }
    public function warning($title,$msg)
    {
        return $this->create($title, $msg  = "", "warning");
    }
    public function error($title,$msg)
    {
        return $this->create($title, $msg  = "", "error");
    }
}