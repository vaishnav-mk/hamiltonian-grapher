# Hamiltonian Grapher
Project for [Quantathon](https://quantathon.devfolio.co/prizes)

# `Problem Statement`

```
Given a Hamiltonian
+0.00698131079425246 * IIIZ
-0.0004978294000830275 * IIZI
+4.664512584628966e-05 * IZII
+0.0004303465157577957 * ZIII
+0.5099539391488543 * IIZZ
+0.5099677387273946 * IZIZ
+0.5099488492845516 * IZZI
+0.5099106232913859 * ZIIZ
+0.5099467089998899 * ZIZI
+0.5099046167492709 * ZZII

and the ansatz
ry = TwoLocal(num_assets, "ry", "cz", reps=3, entanglement="full")

Find the following using SamplingVQE and EsimatorVQE for every step of the iteration

Eigenstates, corresponding eigenvalues, and their probability.
Also, extract the variational parameters associated with every step of the iteration.
```

# `Solution`
Here's an explanation of the key components of the code:

**Importing Libraries:** The code starts by importing necessary libraries and modules, including FastAPI for creating the API, Pydantic for defining data models, Qiskit for quantum computing, and other relevant dependencies.

**Data Models:**
- `PauliTerm` and `HamiltonianInput` are Pydantic models used for validating the input data. `PauliTerm` represents a single term in the Hamiltonian, including its coefficient and operator. `HamiltonianInput` is a list of `PauliTerm` instances, representing the entire Hamiltonian.

**CalculationStatus Model:**
- Another Pydantic model, `CalculationStatus`, is defined to represent the status of the calculation for each iteration. It includes fields for the iteration number and the status.

**FastAPI Setup:**
- An instance of FastAPI is created as `app`.

**API Endpoint:**
- The `/eigen` endpoint is defined to receive a POST request. It expects a JSON payload with `HamiltonianInput` data and an optional `iterations` parameter (default is 5).

**Processing Hamiltonian:**
- The code processes the Hamiltonian input by converting it into a Qiskit `PauliOp`. It iterates through the terms in the Hamiltonian, parses the operator strings, and builds the corresponding Pauli operators (I, X, Y, Z) for each term. These Pauli operators are then combined to create the `hamiltonian_op`.

**Ansatz Setup:**
- The code sets up an ansatz circuit using `TwoLocal`. It uses the "ry" (Ry) rotation gate and "cz" (Controlled-Z) entanglement, with a specified number of repetitions.

**Backend and Optimizer:**
- It defines the quantum backend as the Aer simulator and selects the SPSA optimizer with a maximum of 50 iterations.

**VQE Initialization:**
- The Variational Quantum Eigensolver (VQE) is initialized with the ansatz, optimizer, and quantum instance.

**Iteration and Calculation:**
- The code then enters a loop for the specified number of iterations. Inside each iteration, it computes the minimum eigenvalue of the Hamiltonian using VQE. It retrieves the eigenstate, eigenvalue, and optimal variational parameters associated with the result.


# `Installation`

```sh
pip3 install -r requirements.txt
cd frontend
npm install
```

# `Backend`

```sh
# Deployment
cd backend
uvicorn main:app

# Development
uvicorn main:app --reload
```

# `FrontEnd`

```sh
# Deployment
cd frontend
npm run build
npm start

# Development
npm run dev
```
# `Images`
![Cr6Hy9pP](https://github.com/vaishnav-mk/hamiltonian-grapher/assets/84540554/3a8181d2-83d5-42a9-96e6-e57fe270be62)

![image](https://github.com/vaishnav-mk/hamiltonian-grapher/assets/84540554/ed282462-732e-41b9-a4f8-7fc6a93e4241)
![image](https://github.com/vaishnav-mk/hamiltonian-grapher/assets/84540554/2fc65bea-96cb-4ba3-a07a-3433f8fe44b1)
![image](https://github.com/vaishnav-mk/hamiltonian-grapher/assets/84540554/cc3fa284-58ac-4657-85dd-ab4737125f8c)
![image](https://github.com/vaishnav-mk/hamiltonian-grapher/assets/84540554/64c5ff21-d704-4ee9-a0d3-7d61ede3259d)
![image](https://github.com/vaishnav-mk/hamiltonian-grapher/assets/84540554/a31e09d6-b76c-4822-ac4f-1ade8fb34b4d)
![image](https://github.com/vaishnav-mk/hamiltonian-grapher/assets/84540554/f2cc2061-5706-4aae-a3be-e9e8d27303b7)
![image](https://github.com/vaishnav-mk/hamiltonian-grapher/assets/84540554/29449621-9d5f-4a20-9482-d4c8dd7e72dc)
