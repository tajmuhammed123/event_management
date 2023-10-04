import { useFormik } from "formik";
import { CategoreySchema } from "../../../Validation/validation";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input } from "@material-tailwind/react";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { addEventCategorey } from "../../../actions/AdminActions";

function EventCategory() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    const queryClient = useQueryClient();
  
    
    const initialValues = {
      categorey:"",
      description:"",
      eventlogo:[]
    }
    const {
      values,
      errors,
      touched,
      handleBlur,
      handleSubmit,
      handleChange,
      setFieldValue
    } = useFormik({
      initialValues:initialValues,
      validationSchema:CategoreySchema,
      onSubmit: async (values,{resetForm}) => {
          if(values){
            addEventCategorey(formData)
              setOpen(!open);
              console.log(values);
              resetForm()
              queryClient.invalidateQueries("categorey");
          }
      }
    })
    const formData = new FormData()
    formData.append("categorey", values.categorey);
    formData.append("description", values.description);
    // for (let i = 0; i < values.eventlogo.length; i++) {
    //     formData.append("eventlogo", values.eventlogo[i]);
    //   }
    formData.append("eventlogo", values.eventlogo);
    for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
  return (
    <>
        <Button onClick={handleOpen} className="flex items-center gap-3 bg-[#305861]" size="sm">
               Add Categorey
            </Button>
      <Dialog open={open} handler={handleOpen} size="sm" className="bg-[#CAF0F8]">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
        <DialogHeader>ADD CATEGOREY</DialogHeader>
        <DialogBody className="flex justify-center">
        <div className="mt-8 mb-2 w-70 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-4">
          <Input size="lg" name="categorey" label="Categorey"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.categorey}
          />
          {touched.categorey && errors.categorey && (
            <div className="text-red-500 text-sm ">{errors.categorey}</div>
          )}
          <Input size="lg" name="description" label="Description"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.description}
          />
          <Input 
            size="lg" 
            type="file" 
            variant="standard" 
            name="eventlogo"
            label="Event Logo" 
            onChange={(event) => {
              const selectedFile = event.currentTarget.files[0];
              console.log(selectedFile);
              setFieldValue("eventlogo", selectedFile);
          
              
              const formData = new FormData();
              formData.append("eventlogo", selectedFile)

            //   for (let i = 0; i < selectedFiles.length; i++) {
            //     formData.append("eventlogo", selectedFiles[i]);
            //   }
            for (const pair of formData.entries()) {
                console.log(pair[0], pair[1]);
              }
            }}
            />
          {touched.description && errors.description && (
            <div className="text-red-500 text-sm ">{errors.description}</div>
          )}
        </div>
        </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="filled" type="submit" color="green">
            <span>Confirm</span>
          </Button>
        </DialogFooter>
        </form>
      </Dialog>
    </>
  )
}

export default EventCategory