package com.reto_3.service;


import com.reto_3.entity.Client;
import com.reto_3.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getAll(){
        return clientRepository.getAll();
    }

    public Optional<Client> getClient(int idClient){
        return clientRepository.getClient(idClient);
    }

    public Client save(Client client){
        if(client.getIdClient()==null){
            return clientRepository.save(client);
        } else {
            Optional<Client > e=clientRepository.getClient(client.getIdClient());
            if(e.isEmpty()){
                return clientRepository.save(client);
            } else {
                return client;
            }
        }
    }

    public Client  update(Client  client){
        if(client.getIdClient()!=null){
            Optional<Client > q = clientRepository.getClient(client.getIdClient());
            if(q.isPresent()){
                if(client.getName()!=null){
                    q.get().setName(client.getName());
                }
                if(client.getEmail()!=null){
                    q.get().setEmail(client.getEmail());
                }
                if(client.getPassword()!=null){
                    q.get().setPassword(client.getPassword());
                }
                if(client.getAge()!=null){
                    q.get().setAge(client.getAge());
                }

                clientRepository.save(q.get());
                return q.get();

            }else {
                return client;
            }

        }else {
            return client;
        }
    }


    public boolean delete(int id){
        Boolean flag=false;
        Optional<Client> client=clientRepository.getClient(id);
        if(client.isPresent()){
            clientRepository.deleteClient(client.get().getIdClient());
            flag=true;
        }

        return flag;
    }
}
