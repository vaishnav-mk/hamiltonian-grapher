from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from qiskit import Aer
from qiskit.algorithms.optimizers import SPSA
from qiskit.algorithms import VQE
from qiskit.opflow import I, Z, X, Y, PauliOp
from qiskit.circuit.library import TwoLocal
from qiskit.utils import QuantumInstance
from fastapi.encoders import jsonable_encoder
from matplotlib import pyplot as plt

app = FastAPI()

from typing import List
from pydantic import BaseModel


class PauliTerm(BaseModel):
    coefficient: float
    operator: str


class HamiltonianInput(BaseModel):
    terms: List[PauliTerm]

def plot(values):
    plt.plot(values)
    plt.show()



@app.post("/eigen")
def calculate_eigenvalues(hamiltonian: HamiltonianInput, iterations: int = 5):
    pauli_terms = []
    for term in hamiltonian.terms:
        pauli_term = term.coefficient * I
        for char in term.operator.strip().replace("ZZ", "II").replace("YY", "II").replace("XX", "II"):
            if char == "I":
                continue
            if char == "X":
                pauli_term = pauli_term ^ X
            elif char == "Y":
                pauli_term = pauli_term ^ Y
            elif char == "Z":
                pauli_term = pauli_term ^ Z
            else:
                raise ValueError("Invalid Pauli operator:", char)
        pauli_terms.append(pauli_term)
    
    hamiltonian_op = PauliOp(pauli_term.primitive, sum([i.coeff for i in pauli_terms]))

    num_assets = len(hamiltonian.terms[0].operator)
    ansatz = TwoLocal(num_assets, "ry", "cz", reps=3, entanglement="full")

    backend = Aer.get_backend("aer_simulator")

    optimizer = SPSA(maxiter=100)
    vqe = VQE(
        ansatz=ansatz,
        optimizer=optimizer,
        quantum_instance=QuantumInstance(backend=backend),
    )

    results = []
    for _ in range(iterations):
        result = vqe.compute_minimum_eigenvalue(hamiltonian_op)
        eigenstate = str(result.eigenstate)
        eigenvalue = str(result.eigenvalue)
        var_params = list(result.optimal_parameters.values())
        iteration_result = {
         "eigenstate": eigenstate,
         "eigenvalue": eigenvalue,
         "variational_parameters": var_params,
        }
        results.append(iteration_result)
    
    # plot(var_params)

    return jsonable_encoder(results)