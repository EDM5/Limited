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
      [2, 9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      [2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 2, 9, 2, 1, 1, 1, 1, 1, 1, 2],
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
  
  this.camera = {
    x: 0,
    y: 0
  };
  
  this.key = {
    left: false,
    right: false,
    up: false
  };
  
  this.player = {
    
    loc: {
      x: 0,
      y: 0
    },
    
    vel: {
      x: 0,
      y: 0
    },
    
    can_jump: true
  };
  
  window.onkeydown = this.keydown.bind(this);
  window.onkeyup = this.keyup.bind(this);
};

Standard.prototype.error = function(message) {
  if(this.alert_errors) alert(message);
  if(this.log_info) console.log(message);
};

Standard.prototype.log = function(message) {
  if(this.log_info) console.log(message);
};

Standard.prototype.set_viewpoint = function(x, y) {
  this.viewport.x = x;
  this.viewport.y = y;
};

Standard.prototype.keydown = function(e) {
  var _this = this;
  
  switch(e.keyCode) {
    case 65:
      _this.key.left = true;
      break;
    case 83:
      _this.key.up = true;
      break;
    case 68: 
      _this.key.right = true;
      break;
  }
};

Standard.prototype.keyup = function(e) {
  var _this = this;
  
  switch(e.keyCode) {
    case 65:
      _this.key.left = false;
      break;
    case 83:
      _this.key.up = false;
      break;
    case 68: 
      _this.key.right = false;
      break;
  }
};

Standard.prototype.load_map = function(map) {
  if(typeof map === 'undefined'
  || typeof map.data === 'undefined'
  || typeof map.keys === 'undefined') {
    this.error('Error: invalid map data');
    return false;
  }
  
  this.current_map = map;
  this.current_map.background = map.background || '#333';
  this.current_map.gravity = map.gravity || {x: 0, y: 0.3};
  this.tile_size = map.tile_size || 16;
  
  var _this = this;
  
  this.current_map.width = 0;
  this.current_map.height = 0;
  
  map.keys.forEach(function(key) {
    map.data.forEach(function (row, y) {
      _this.current_map.height = Math.max(_this.current_map.height, y);
      
      row.forEach(function(tile, x) {
        _this.current_map.width = Math.max(_this.current_map.width, x);
        
        if(tile == key.id)
          _this.current_map.data[y][x] = key;
      });
    });
  });
  
  this.current_map.width_p = this.current_map.width * this.tile_size;
  this.current_map.height_p = this.current_map.height * this.tile_size;
  this.player.loc.x = map.player.x * this.tile_size || 0;
  this.player.loc.y = map.player.y * this.tile_size || 0;
  this.player.colour = map.player.colour || '#000';
  
  this.key.left  = false;
  this.key.up    = false;
  this.key.right = false;
    
  this.camera = {
      x: 0,
      y: 0
  };
    
  this.player.vel = {
      x: 0,
      y: 0
  };

  this.log('Successfully loaded map data.');

  return true;
};

Standard.prototype.get_tile = function(x, y) {
  return(this.current_map.data[y] && this.current_map.data[y][x])?
  this.current_map.data[y][x] : 0;
};

