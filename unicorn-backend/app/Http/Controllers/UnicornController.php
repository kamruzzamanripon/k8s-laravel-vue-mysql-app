<?php

namespace App\Http\Controllers;

use App\Models\Unicorn;
use Illuminate\Http\Request;

class UnicornController extends Controller
{
    public function index()
    {
        $data = Unicorn::orderBy('created_at','desc')->get();

        return $data;
    }

    public function store(Request $request)
    {
        $data = Unicorn::create($request->all());

        return $data;
    }

    public function singleInfo(Unicorn $unicorn)
    {
        return $unicorn;
    }
    
    public function updateSingleInfo(Unicorn $unicorn, Request $request)
    {
        $unicorn->update($request->all());

        return $unicorn;
    }
    
    public function delete(Unicorn $unicorn)
    {
        $unicorn->delete();
        
        return $unicorn;
    }
}
