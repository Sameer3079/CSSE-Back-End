package csse.construction_management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import csse.construction_management.models.EmployeeModel;
import csse.construction_management.repository.EmployeeRepository;

@RestController("/employees")
public class EmployeeController {

	@Autowired
	EmployeeRepository employeeRepository;

	@GetMapping
	public List<EmployeeModel> getAll() {
		return employeeRepository.findAll();
	}

//	@GetMapping("/{id}")
//	public EmployeeModel getOne(@PathVariable(value="id") String id) {
//		// qwe
//	}

	@PostMapping
	public EmployeeModel createEmployee(@RequestBody EmployeeModel employee) {
		return employeeRepository.save(employee);
	}
	
//	@PutMapping
//	public EmployeeModel updateEmployee(@RequestBody EmployeeModel employee) {
//		employeeRepository.save(employee);
//	}
}