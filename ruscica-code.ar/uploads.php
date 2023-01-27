<?php
    echo "desde php";
    if(isset($_FILES['file'])){        
        $file = $_FILES['file'];        
        $file_name = $file['name'];
        $file_tmp = $file['tmp_name'];
        $file_size = $file['size'];
        $file_error = $file['error'];
        $file_ext = explode('.', $file_name);
        $file_ext = strtolower(end($file_ext));
        $allowed = array('jpg', 'jpeg', 'png', 'pdf');
        if(in_array($file_ext, $allowed)){
            if($file_error === 0){
                if($file_size <= 6097152){
                    $file_name_new = uniqid('', true) . '.' . $file_ext;
                    $file_destination = 'uploads/' . $file_name;
                    if(move_uploaded_file($file_tmp, $file_destination)){
                        echo 'File uploaded successfully';
                    } else {
                        echo 'File not uploaded';
                    }
                } else {
                    echo 'File size too large';
                }
            } else {
                echo 'Error uploading file';
            }
        } else {
            echo 'Invalid file type';
        }
    }
?>
