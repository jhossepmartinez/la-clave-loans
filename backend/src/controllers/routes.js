import UserController from './UserController.js';
import SolicitudesController from './SolicitudesController.js'

export default (app) => {
	const userController = new UserController();
    const solicitudesController = new SolicitudesController();

	app.get('/users', userController.getAll);
	app.post('/users', userController.create);
	app.get('/users/:userId', userController.get);
	app.put('/users/:userId', userController.update);
	app.delete('/users/:userId', userController.delete);
    app.get('/solicitudes', solicitudesController.getAll);
    app.post('/solicitudes', solicitudesController.create);
    app.get('/solicitudes/:solicitudesId', solicitudesController.get);
    app.put('/solicitudes/:solicitudesId', solicitudesController.update)

};
