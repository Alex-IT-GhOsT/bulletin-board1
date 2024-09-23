<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request):Response
    {
        $categoryId = $request->input('category.categoryId');
        $subCategoryId = $request->input('subcategoryId');
        $user = $request->user();
       
        

        if ($user && $user->isAdmin()) {
            return Inertia::render('Admin/Index',[
                'users' => User::with('messages:id,text,user_id')->get(),
            ]);
        } else {
            return Inertia::render('Message/Index',[
            'categoryId' => $categoryId,
            'subCategoryId' => $subCategoryId,
            'messages' => Message::with('category:id,name','user:id,name')->latest()->get(),
            'categories' => Category::with('subcategories:id,category_id,name')->get()
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'category_id' => 'required|exists:categories,id',
            'sub_category_id' => 'required|exists:sub_categories,id',
            'text' => 'required|string|max:255',
        ]);

        Message::create($validated);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request):Response
    {
        $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id'
        ]);

        $user = User::findorFail($validated['user_id']);

        if ($user) {
            return Inertia::render('Admin/Show', [
                'message' => Message::with('category:id,name','subcategory:id,name', 'user:id,name')->where('user_id', $user->id)->get()
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'category_id' => 'required|integer|exists:categories,id',
            'sub_category_id' => 'required|integer|exists:sub_categories,id',
            'text' => 'required|string|max:255'
        ]);

        $userId = $validated['user_id'];
        $categoryId = $validated['category_id'];
        $subCategoryId = $validated['sub_category_id'];
        $text = $validated['text'];

        Message::where('user_id', $userId)
        ->where(function ($query) use ($categoryId,$subCategoryId,$text) {
            $query->where('category_id', $categoryId)
            ->where('sub_category_id', $subCategoryId);
        })
        ->update(['text' => $text]);

        return redirect()->route('show.message');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
       
        $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'category_id' => 'required|integer|exists:categories,id',
            'sub_category_id' => 'required|integer|exists:sub_categories,id'
        ]);

        $userId = $validated['user_id'];
        $categoryId = $validated['category_id'];
        $subCategoryId = $validated['sub_category_id'];

        Message::where('user_id',$userId)
        ->where(function($query) use ($categoryId,$subCategoryId) {
            $query->where('category_id',$categoryId)
            ->where('sub_category_id', $subCategoryId);
        })->delete();
        
        return redirect()->route('show.message');
        
    }
}
