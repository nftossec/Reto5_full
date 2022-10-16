package com.reto_3.controller;


import com.reto_3.entity.Bike;
import com.reto_3.entity.Category;
import com.reto_3.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Category")
@CrossOrigin(origins = "*",methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/all")
    public List<Category> getCategories(){
        return categoryService.getAll();
    }

/*
    @PostMapping("/all")
    @ResponseStatus(HttpStatus.CREATED)
    public Category postCategory(@RequestBody Category category){
        return categoryService.save(category);
    }
*/
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Category postCategory2(@RequestBody Category category){
        return categoryService.save(category);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Category putCategory(@RequestBody Category category){
        return categoryService.update(category);
    }
/*
    @PutMapping("/all")
    @ResponseStatus(HttpStatus.CREATED)
    public Category putCategory2(@RequestBody Category category){
        return categoryService.update(category);
    }
*/
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCategory(@PathVariable("id") int id){
        categoryService.delete(id);
    }

}
