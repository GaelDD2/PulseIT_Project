<?php
class ImagenHistorialModel {
    private $upload_path = 'uploads/';
    private $valid_extensions = ['jpeg', 'jpg', 'png', 'gif'];
    public $enlace;

    public function __construct() {
        $this->enlace = new MySqlConnect();
    }

    /**
     * Subir múltiples imágenes y asociarlas a un historial de ticket
     * @param array $object - contiene $_FILES y el id del historial
     * @return array
     */
    public function uploadEvidencias($object) {
        $files = $object['files'];
        $id_historial = $object['id_historial'];
        $id_usuario = $object['id_usuario'];

        $uploadedFiles = [];

        

        // Recorrer cada archivo
        for ($i = 0; $i < count($files['name']); $i++) {
            $fileName = $files['name'][$i];
            $tempPath = $files['tmp_name'][$i];
            $fileSize = $files['size'][$i];
            $fileError = $files['error'][$i];

            if (!empty($fileName)) {
                $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
                $uniqueFileName = "evidencia_" . uniqid() . "." . $fileExt;

                // Validar tipo
                if (in_array($fileExt, $this->valid_extensions)) {
                    if ($fileSize < 5000000 && $fileError == 0) { // límite de 5MB
                        // Mover el archivo
                        if (move_uploaded_file($tempPath, $this->upload_path . $uniqueFileName)) {

                            $ruta = "http://localhost:81/PulseIT/api/uploads/" . $uniqueFileName;
                            // Insertar registro en BD
                            $sql = "INSERT INTO imagenes_historial_tickets (id_historial, nombre_archivo,ruta,tamano_bytes,id_usuario, fecha_subida)
                                    VALUES ($id_historial, '$uniqueFileName',' $ruta',$fileSize,$id_usuario, NOW())";
                            $resultado = $this->enlace->executeSQL_DML($sql);

                            if ($resultado > 0) {
                                $uploadedFiles[] = $uniqueFileName;
                            }
                        }
                    }
                }
            }
        }

        // Respuesta final
        if (!empty($uploadedFiles)) {
            return [
                'success' => true,
                'uploaded' => $uploadedFiles,
                'message' => count($uploadedFiles) . ' imagen(es) subida(s) correctamente.'
            ];
        } else {
            return [
                'success' => false,
                'message' => 'No se subió ninguna imagen válida.'
            ];
        }
    }
}