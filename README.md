# ctrl-alt-del
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

![image](https://github.com/vaishnav-mk/hamiltonian-grapher/assets/84540554/2fc65bea-96cb-4ba3-a07a-3433f8fe44b1)
![image](https://github.com/vaishnav-mk/hamiltonian-grapher/assets/84540554/cc3fa284-58ac-4657-85dd-ab4737125f8c)
![image](https://github.com/vaishnav-mk/hamiltonian-grapher/assets/84540554/64c5ff21-d704-4ee9-a0d3-7d61ede3259d)
![image](https://github.com/vaishnav-mk/hamiltonian-grapher/assets/84540554/a31e09d6-b76c-4822-ac4f-1ade8fb34b4d)
