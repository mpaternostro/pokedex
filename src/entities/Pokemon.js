class Pokemon {
  constructor(id, name, height, weight, types = [], stats = [], baseExperience, sprite) {
    this.id = id;
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.types = types;
    this.stats = stats;
    this.baseExperience = baseExperience;
    this.sprite = sprite;
  }
}

export default Pokemon;
