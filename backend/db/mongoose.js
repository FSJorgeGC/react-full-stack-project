import mongoose from "mongoose";

export const conectarDB = async () => {

    const url = process.env.MONGO_URI;

    try{
        await mongoose.connect(url);
        console.log("✅ Conexión a MongoDB exitosa");
        console.log("🚀 Base de datos actual ", mongoose.connection.db.databaseName);


        // Pedimos a MongoDB que nos muestre los nombres de las colecciones
        const colecciones = await mongoose.connection.db.listCollections().toArray();
        console.log("Colecciones disponibles:", colecciones.map(c => c.name));
        
        
    }catch (error) {
        console.error("❌ Error al conectar a MongoDB:", error);
        process.exit(1); // Salimos del proceso si no se puede conectar
    } 
}