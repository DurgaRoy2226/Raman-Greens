import { motion } from "framer-motion";

export function About() {
  const machinery = [
    {
      id: 1,
      name: "Precision Processing Line",
      description: "Automated stainless steel processing machinery designed for meticulous sorting, cleaning, and preparation of raw ingredients.",
      image: "/images/food_processing.png"
    },
    {
      id: 2,
      name: "Automated Packaging System",
      description: "Advanced packaging technology that guarantees hygienic, airtight sealing to preserve the freshness and quality of our products.",
      image: "/images/packaging.png"
    },
    {
      id: 3,
      name: "Industrial Dehydrator",
      description: "State-of-the-art commercial dehydration unit ensuring maximum retention of nutrients and flavor while significantly extending shelf life.",
      image: "/images/dehydrator.png"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-emerald-brand text-white py-12 sm:py-16 md:py-24 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">About Raman Greens</h1>
        <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto opacity-90 leading-relaxed font-light">
          Dedicated to bringing you the finest quality, chemical-free dehydrated products with a perfect blend of tradition and modern technology.
        </p>
      </section>

      {/* Machinery Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 mb-3 sm:mb-4">Our Advanced Machinery</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
            We leverage cutting-edge industrial equipment to ensure our production process is highly efficient, perfectly hygienic, and exceptionally consistent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {machinery.map((machine, index) => (
            <motion.div
              key={machine.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-beige-soft"
            >
              <div className="relative h-64 overflow-hidden bg-beige-warm">
                <img
                  src={machine.image}
                  alt={machine.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-neutral-800 mb-3 group-hover:text-emerald-brand transition-colors">
                  {machine.name}
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
                  {machine.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
