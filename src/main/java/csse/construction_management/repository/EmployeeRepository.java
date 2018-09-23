package csse.construction_management.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import csse.construction_management.models.EmployeeModel;

@Repository
public interface EmployeeRepository extends MongoRepository<EmployeeModel, String>{

}
