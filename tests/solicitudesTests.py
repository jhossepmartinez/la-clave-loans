import unittest
import requests
import json

class SolicitudesTests(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.base_url = "http://localhost:8080"
        cls.headers = {"Content-Type": "application/json"}
        cls.valid_request_data = {
            "pago_mensual": 100,
            "pago_total": 1000,
            "interes_total": 50
        }

        cls.invalid_request_data = {
            "pago_total": 1000,
            "interes_total": 50
        }

        cls.valid_request_data_estado =  {
                "estado": "Aceptado"
        }

        cls.invalid_request_data_estado =  {
                "estado": "Invalido"
        }

        cls.expected_invalid_request_data_message = "Missing attributes: pago_mensual"
        cls.expected_invalid_request_data_estado_message =  "'estado' attribute should be 'Aceptado' or 'Rechazado'"

        cls.unexistent_solicitud_id = 999999999

    @classmethod
    def tearDownClass(cls):
        del cls.base_url
        del cls.headers
        del cls.valid_request_data
        del cls.invalid_request_data
        del cls.valid_request_data_estado
        del cls.invalid_request_data_estado
        del cls.expected_invalid_request_data_message
        del cls.expected_invalid_request_data_estado_message

    # Endpoint usado para obtener todas las solicitudes
    def test_getAll(self):
        response = requests.get(f"{self.base_url}/solicitudes")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(isinstance(data, list))


    # Endpoint usado para crear solicitudes
    def test_create_valid_data(self):
        response = requests.post(f"{self.base_url}/solicitudes", json=self.valid_request_data)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])

    def test_create_invalid_data(self):
        response = requests.post(f"{self.base_url}/solicitudes", json=self.invalid_request_data)
        self.assertEqual(response.status_code, 400)
        data = response.json()
        self.assertFalse(data["success"])
        # Validacion extra mensaje esperado
        self.assertEqual(data["message"], self.expected_invalid_request_data_message)

    # Endpoint usado por gerente para actualizar estado de solicitudes
    def test_update_valid_data(self):
        response = requests.put(f"{self.base_url}/solicitudes/1", json=self.valid_request_data_estado)
        data = response.json()
        self.assertTrue(data["success"])

    def test_update_invalid_data(self):
        response = requests.put(f"{self.base_url}/solicitudes/1", headers=self.headers, json=self.invalid_request_data_estado)
        data = response.json()
        self.assertFalse(data["success"])
        # Validacion adicional: Que mensaje sea el esperado
        self.assertEqual(data["message"], self.expected_invalid_request_data_estado_message)

    # Test de get solicitud no existente
    def test_get(self):
        response = requests.get(f"{self.base_url}/solicitudes/{self.unexistent_solicitud_id}")
        self.assertEqual(response.status_code, 404)

if __name__ == "__main__":
    unittest.main()
