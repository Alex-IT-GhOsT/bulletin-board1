<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class UserController extends Controller
{


    public function update(Request $request):RedirectResponse 
    {
        
        $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id'
        ]);

        
        $user = User::find($validated['user_id']);

        

        if ($user) {
            $user->isBan = !$user->isBan;
            $user->save();
        }
       
        return redirect()->back()->with('success', 'User status updated successfully!');
        

        
    }


}