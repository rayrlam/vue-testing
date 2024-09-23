<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TodoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|min:3|max:255'
        ];
    }

    public function messages(){
        return [
            'title.required' => 'The title is required.',
            'title.min' => 'The title should be at least 3 characters.',
            'title.max' => 'The title should not more than 255 characters.',
        ];
    }
}
