package com.reto_3.controller;


import com.reto_3.entity.UsuaryAdmin;
import com.reto_3.service.UsuaryAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Admin")
public class UsuaryAdminController {

    @Autowired
    private UsuaryAdminService usuaryAdminService;

    @GetMapping("/all")
    public List<UsuaryAdmin> getAdmins(){
        return usuaryAdminService.getAll();
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public UsuaryAdmin postAdmin(@RequestBody UsuaryAdmin usuaryAdmin){
        return usuaryAdminService.save(usuaryAdmin);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public UsuaryAdmin putAdmin(@RequestBody UsuaryAdmin usuaryAdmin){
        return usuaryAdminService.update(usuaryAdmin);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAdmin(@PathVariable("id")int id ){
        usuaryAdminService.delete(id);
    }
}
