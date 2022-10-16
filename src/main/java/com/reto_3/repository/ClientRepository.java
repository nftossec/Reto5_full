package com.reto_3.repository;


import com.reto_3.entity.Client;
import com.reto_3.repository.crudRepository.ClientCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ClientRepository {
    @Autowired
    private ClientCrudRepository clientCrudRepository;

    public List<Client> getAll(){
        return (List<Client>) clientCrudRepository.findAll();
    }


    public Client save(Client client){
        return clientCrudRepository.save(client);
    }


    public Optional<Client> getClient(Integer idClient){
        return clientCrudRepository.findById(idClient);
    }

    public void deleteClient(Integer id){
        clientCrudRepository.deleteById(id);
    }
}
