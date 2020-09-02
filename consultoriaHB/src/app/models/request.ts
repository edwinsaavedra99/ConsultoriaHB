export class Request {
    $id?: string;
    nombres: string;
    apellidos: string;
    correo: string;
    celular: string;
    consulta: string;
    fecha: string;
    hora: string;
}

export class deviceRequest{
    event: boolean;
    device: boolean;
}

export class ResetPasswordRequest{
    $id?:string;
    date:string;
    time:string;
    user_key: string; 
}