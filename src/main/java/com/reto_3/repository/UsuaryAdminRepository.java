package com.reto_3.repository;

import com.reto_3.entity.UsuaryAdmin;
import com.reto_3.repository.crudRepository.UsuaryAdminCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UsuaryAdminRepository {
    @Autowired
    private UsuaryAdminCrudRepository usuaryAdminCrudRepository;

    public List<UsuaryAdmin> getAll(){
        return (List<UsuaryAdmin>) usuaryAdminCrudRepository.findAll();
    }

    public UsuaryAdmin save(UsuaryAdmin usuaryAdmin){
        return usuaryAdminCrudRepository.save(usuaryAdmin);
    }

    public Optional<UsuaryAdmin> getUsuaryAdmin(Integer id){
        return usuaryAdminCrudRepository.findById(id);
    }


    public void deleteAdmin(Integer id){
        usuaryAdminCrudRepository.deleteById(id);
    }
}
