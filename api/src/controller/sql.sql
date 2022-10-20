SELECT *
FROM dogs;


SELECT *
FROM temperaments;


SELECT *
from dogs_temperaments;

SELECT dogs."id", 
    dogs."name", 
	dogs.temperament, 
	dogs.height, 
	dogs.weight, 
	dogs.life_span, 
	dogs.image, 
	temperaments."id", 
	temperaments."name" AS temperaments 
    FROM dogs 
    INNER JOIN dogs_temperaments ON dogs."id" = dogs_temperaments."dogId" 
    INNER JOIN temperaments ON dogs_temperaments."temperamentId" = temperaments."id";
