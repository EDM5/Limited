var map = {
  tile_size: 16,
  
  keys: [
    {id: 0, color: '#333', solid: 0},
    {id: 1, color: '#888', solid: 0},
    {id: 2, color: '#555', solid: 1, bounce: 0.35},
    {id: 3, color: 'rgba(121, 220, 242, 0.4)', friction: {x: 0.9, y: 0.9} gravity: {x: 0, y: 0.1}, jump: 1, fore: 1},
    {id: 4, color: '#777', jump: 1},
    {id: 5, color: '#E373FA', solid: 1, bounce: 1.1},
    {id: 6, color: '#666', solid: 1, bounce: 0},
    {id: 7, color: '#73C6FA', solid: 0, script: 'change_color'},
    {id: 8, color: '#FADF73', solid: 0, script: 'next_level'},
    {id: 9, color: '#C93232', solid: 0, script: 'death'},
    {id: 10, color: '#555', solid: 1},
    {id: 11, color: '#0FF', solid: 0, script: 'unlock'},
  ],
  
  data: [
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      [2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      [2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ],
    
  gravity: {
    x: 0,
    y: 0.3
  },
  
  vel_limit: {
    x: 2,
    y: 16
  },
  
  movement_speed: {
    jump: 6,
    left: 0.3,
    right: 0.3
  },
  
  player: {
    x: 2,
    y: 2,
    color: '#FF9900'
  },
  
  scripts: {
    change_color: 'game.player.color = "#" + (Math.random() * 0xFFFFFF<<0).toString(16);',
    next_level: 'alert("Congratulations! You beat the map!"); game.load_map(map);',
    death: 'alert("You lost!"); game.load_map(map);',
    unlock: 'game.current_map.keys[10].solid = 0; game.current_map.keys[10].color = #888;'
  }
};

var Standard = function() {
  this.alert_errors = false;
  this.log_info = true;
  this.tile_size = 16;
  this.limit_viewport = false;
  this.jump_switch = 0;
  
  this.viewport = {
    x: 200,
    y: 200
  };
  
  this.camera =
}
    
